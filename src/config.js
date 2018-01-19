import {get} from "lodash"

export default {
    api: get(window, "__CONFIG__.API_HOST") || "http://localhost:3005",
    siteKey: get(window, "__CONFIG__.SITE_KEY") || "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI",
}