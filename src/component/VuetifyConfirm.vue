<template>
  <v-dialog v-model="value" max-width="500px" @input="cancelAction()" @keydown.esc="cancelAction()">
    <v-card>
      <v-card-title class="headline">{{title}}</v-card-title>
      <v-card-text>{{text}}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="red"
          v-if="!this.loading"
          @click="cancelAction"
          flat
          :loading="this.loading"
        >{{cancelText}}</v-btn>
        <v-btn color="green" @click="confirmAction" flat :loading="this.loading">{{confirmText}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['title', 'text', 'cancelText', 'confirmText'],
  data() {
    return {
      value: false,
      loading: false
    }
  },
  watch: {
    value: function() {
      this.resetState()
    }
  },
  methods: {
    open() {
      this.value = true
    },
    resetState() {
      this.loading = false
    },
    confirmAction() {
      this.loading = true
      this.value = false
      this.$emit('confirmAction')
    },
    cancelAction() {
      this.loading = true
      this.value = false
      this.$emit('cancelAction')
    }
  }
}
</script>
