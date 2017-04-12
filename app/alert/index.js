import angular from "angular";

export const AlertModule = angular
    .module("alert.module", [])
    .service(
        "AlertService",
        class AlertService {
            constructor($timeout) {
                this.alert = {
                    message: ""
                }
                this.$timeout = $timeout;
            }
            addAlert(message,displayClass) {
                this.alert.message = message;
                this.alert.displayClass = displayClass;
                this.$timeout(5000).then(() => this.alert.message = '');
            }
        }
    )
    .controller(
        "AlertController",
        class AlertController {
            constructor(AlertService) {
                this.alert = AlertService.alert;
            }
        }
    ).name;
