<!-- 生成JSEncrypt密钥公钥 -->
<template>
  <div>
    <h1>密钥生成</h1>
    <div>公钥</div>
    <div>私钥</div>
  </div>
</template>

<script>
import forge from 'node-forge';
export default {
  data() {
    return {
      publicKey: '',
      privateKey: ''
    };
  },
  mounted() {
    this.generateRSAKeyPair();
  },
  methods: {
    generateRSAKeyPair() {
      const keys = forge.pki.rsa.generateKeyPair(2048);
      this.publicKey = forge.pki.publicKeyToPem(keys.publicKey);
      console.log(this.publicKey)
      this.privateKey = forge.pki.privateKeyToPem(keys.privateKey);
      console.log(this.privateKey)
    }
  }

}
</script>

<style>

</style>