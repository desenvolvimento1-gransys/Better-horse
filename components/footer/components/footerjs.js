
import { mapState } from "vuex";
import paymentDiv from '@/components/footer/components/others/paymentDiv'
export default {
    computed: {
        ...mapState("Layouts", ["layout"]),
    },
    components: {
        paymentDiv
    }
};