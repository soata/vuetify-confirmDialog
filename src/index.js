import VuetifyConfirmDialog from "./component/VuetifyConfirm.vue";
import PromiseVuetifyConfirm from "./component/PromiseVuetifyConfirm.vue";

let Plugin = function(Vue, globalOptions = {}) {
  this.Vue = Vue;
  this.mounted = false;
  this.$root = {};
};

Plugin.prototype.mountIfNotMounted = function() {
  if (this.mounted === true) {
    return;
  }

  this.$root = (() => {
    let ConfirmConstructor = this.Vue.extend(PromiseVuetifyConfirm);
    let node = document.createElement("div");
    document.querySelector("body").appendChild(node);
    return new ConfirmConstructor().$mount(node);
  })();

  this.mounted = true;
};

Plugin.prototype.destroy = function() {
  if (this.mounted === true) {
    let elem = this.$root.$el;
    this.$root.$destroy();
    this.$root.$off();
    elem.remove();
    this.mounted = false;
  }
};

Plugin.prototype.open = function(title, text, cancelText="キャンセル", confirmText="OK") {
  this.mountIfNotMounted();
  return new Promise((resolve, reject) => {
    let localOptions = {};
    localOptions.title = title;
    localOptions.text = text;
    localOptions.cancelText = cancelText;
    localOptions.confirmText = confirmText;

    localOptions.promiseResolver = resolve;
    localOptions.promiseRejecter = reject;

    localOptions.isOpen = true;
    this.$root.commit(localOptions);
  });
};

Plugin.install = function(Vue, options) {
  Vue.component("confirmDialog", VuetifyConfirmDialog);
  Vue.vuetifyConfirmDialog = new Plugin(Vue, options);

  Object.defineProperties(Vue.prototype, {
    $confirm: {
      get() {
        return Vue.vuetifyConfirmDialog;
      }
    }
  });
};

export default Plugin;
export { VuetifyConfirmDialog };
