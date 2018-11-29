<template>
  <confirmDialog
    ref="dialog"
    :title="state.title"
    :text="state.text"
    :cancelText="state.cancelText"
    :confirmText="state.confirmText"
    v-on:cancelAction="() => this.emmitClose(false)"
    v-on:confirmAction="() => this.emmitClose(true)"
  />
</template>

<script>
export default {
  name: 'PromiseVuetifyConfirm',
  data() {
    return {
      state: {
        isOpen: false,
        title: '',
        text: '',
        cancelText: '',
        confirmText: '',
        promiseResolver: undefined,
        promiseRejecter: undefined
      }
    }
  },
  watch: {
    'state.isOpen'() {
      if (this.state.isOpen) {
        this.$refs.dialog.open()
      }
    }
  },
  methods: {
    commit: function(newState) {
      this.state = newState
    },
    setTitle: function(title) {
      this.state.title = title
    },
    setText: function(text) {
      this.state.text = text
    },
    setCancelText: function(text) {
      this.state.cancelText = text
    },
    setConfirmText: function(text) {
      this.state.confirmText = text
    },
    setPromiseHandler: function(promiseRejecter, promiseResolver) {
      this.state.promiseRejecter = promiseRejecter
      this.state.promiseResolver = promiseResolver
    },
    emmitClose: function(flag) {
      this.state.isOpen = false
      if (this.state.promiseResolver) {
        this.state.promiseResolver(flag)
      }
    }
  }
}
</script>
