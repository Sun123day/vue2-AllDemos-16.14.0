<script>
import html2pdf from "html2pdf.js";
import { defineComponent } from "vue";
const AppHome = defineComponent({
    setup() {
        const downloadToPDF = () => {
            const element = document.getElementById("element-order-detail");
            const opt = {
                margin: 1,
                filename: "myfile.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: {
                    unit: "in",
                    format: "letter",
                    orientation: "portrait",
                },
            };
            html2pdf().set(opt).from(element).save();
        };
        return {
            downloadToPDF,
        };
    },
});
export default AppHome;
</script>
<template>
    <div id="app" ref="document">
        <div id="element-to-convert">

        </div>
        <button @click="downloadToPDF">Download to PDF</button>
    </div>
</template>

<style>
#app {
    margin-top: 60px;
    text-align: center;
}
</style>
