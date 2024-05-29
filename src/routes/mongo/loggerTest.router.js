import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    req.logger.error('this is an unhandled error', new Error('This is an error'));
    req.logger.warn('this is a warning');
    req.logger.http('--->');
    req.logger.info('this is an info log');
    req.logger.debug('this is a debug log');
    
    res.send({ status: 'success', message: 'Logger test' });
});

export default router;
