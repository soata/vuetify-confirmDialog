<template>
<<<<<<< HEAD
  <confirmDialog :value="state.isOpen" :title="state.title" :text="state.text" :cancelText="state.cancelText" :confirmText="state.confirmText" v-on:cancelAction="() => this.emmitClose(false)" v-on:confirmAction="() => this.emmitClose(true)" />
=======
  <confirmDialog ref="dialog" :title="state.title" :text="state.text" :cancelText="state.cancelText" :confirmText="state.confirmText" v-on:cancelAction="() => this.emmitClose(false)" v-on:confirmAction="() => this.emmitClose(true)" />
>>>>>>> 8417f79... update: non persistent
</template>

<script>
export default {
  name: "PromiseVuetifyConfirm",
  data() {
    return {
      state: {
        isOpen: false,
        title: "",
        text: "",
        cancelText: "",
        confirmText: "",
        promiseResolver: undefined,
        promiseRejecter: undefined
      }
    };
  },
  methods: {
    commit: function(newState) {
      this.state = newState;
      if(this.state.isOpen){
        this.$refs.dialog.open()
      }
    },
    setTitle: function(title) {
      this.state.title = title;
    },
    setText: function(text) {
      this.state.text = text;
    },
    setCancelText: function(text) {
      this.state.cancelText = text;
    },
    setConfirmText: function(text) {
      this.state.confirmText = text;
    },
    setPromiseHandler: function(promiseRejecter, promiseResolver) {
      this.state.promiseRejecter = promiseRejecter;
      this.state.promiseResolver = promiseResolver;
    },
    emmitClose: function(state) {
      if (this.state.promiseResolver) {
        this.state.promiseResolver(state);
        this.state.isOpen = false;
      }
    }
  }
};
</script>