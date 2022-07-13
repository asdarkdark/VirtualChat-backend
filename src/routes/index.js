import { Router } from "express";
import login from "./users/login";
import OptionsSupport from "./optionsSupport/optionsSupport";
import Severity from "./severity/severity";
import Chats from "./chats/chats";

const router = Router();

router.post('/users/login', login);
router.post('/options-support/getOptions', OptionsSupport.getOptionsSupport);
router.post('/options-support/getOptionsSupportForUser', OptionsSupport.getOptionsSupportForUser);
router.post('/options-support/addOption', OptionsSupport.addOptionSupport);
router.put('/options-support/changeSeverity', OptionsSupport.updateOptionSupport);
router.post('/severities/getSeverities', Severity.getSeverities);
router.post('/severities/getSeveritiesByOption', Severity.getSeveritiesByOption);
router.post('/severities/addSeverity', Severity.addSeverity);
router.post('/chats/getChatsByAdmin', Chats.getChatsByUser);


export default router;