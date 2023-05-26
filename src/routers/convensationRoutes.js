import express from 'express';
import conversationMessageController from '../controllers/conversationMessageController.js';
import authController from '../controllers/authController.js';
import { upload } from '../configs/cloudinary.config.js';

import {
    checkIfUserIsOwnerMessage,
    checkUserIsInConversation
} from '../middlewares/userModelMiddlewares.js';
import conversationController from '../controllers/conversationController.js';

const conversationRouter = express.Router();
conversationRouter.use(authController.protect);

conversationRouter
    .route('/:conversationId/messages')
    .get(
        checkUserIsInConversation,
        conversationMessageController.getAllMessagesByConversation
    )
    .post(
        checkUserIsInConversation,
        upload.single('imageMessage'),
        conversationMessageController.createConversationMessage
    );
conversationRouter
    .route('/:conversationId/messages/:conversationMessageId')
    .delete(
        checkUserIsInConversation,
        checkIfUserIsOwnerMessage,
        conversationMessageController.deleteConversationMessage
    );
conversationRouter
    .route('/:conversationId')
    .delete(
        checkUserIsInConversation,
        conversationController.deleteConversation
    );
export default conversationRouter;
