import User from '../models/user.model.js';

export const uploadDocuments = async (req, res) => {
    const { uid } = req.params;
    const files = req.files;

    try {
        const user = await User.findById(uid);
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }

        const documents = files.map(file => ({
        name: file.originalname,
        reference: file.path,
        }));

        user.documents.push(...documents);
        await user.save();

        res.status(200).json({ message: 'Documents uploaded successfully', documents: user.documents });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const upgradeToPremium = async (req, res) => {
    const { uid } = req.params;

    try {
        const user = await User.findById(uid);
        if (!user) {
        return res.status(404).json({ message: 'User not found' });
        }

        const requiredDocuments = ['Identificación', 'Comprobante de domicilio', 'Comprobante de estado de cuenta'];
        const uploadedDocuments = user.documents.map(doc => doc.name);

        const hasAllDocuments = requiredDocuments.every(doc => uploadedDocuments.includes(doc));

        if (!hasAllDocuments) {
        return res.status(400).json({ message: 'User has not uploaded all required documents' });
        }

        user.role = 'premium';
        await user.save();

        res.status(200).json({ message: 'User upgraded to premium successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
