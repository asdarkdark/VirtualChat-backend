import { Router } from "express";
import login from "./users/login";
import OptionsSupport from "./optionsSupport/optionsSupport";
import Severity from "./severity/severity";
import Chats from "./chats/chats";
import InformationOptions from "./informationOptions/InformationOptions";

const router = Router();

//users
router.post('/users/login', login);

//options support
router.post('/options-support/getOptions', OptionsSupport.getOptionsSupport);
router.post('/options-support/getOptionsSupportForUser', OptionsSupport.getOptionsSupportForUser);
router.post('/options-support/addOption', OptionsSupport.addOptionSupport);
router.put('/options-support/changeSeverity', OptionsSupport.updateOptionSupport);

//severity
router.post('/severities/getSeverities', Severity.getSeverities);
router.post('/severities/getSeveritiesByOption', Severity.getSeveritiesByOption);
router.post('/severities/addSeverity', Severity.addSeverity);

//chats
router.post('/chats/getChatsByAdmin', Chats.getChatsByUser);

//information
router.post('/information/getInformationByOption', InformationOptions.getInformationSupport);
router.post('/information/putInformation', InformationOptions.putInformationSupport);
router.post('/information/addInformation', InformationOptions.addInformationSupport);


export default router;