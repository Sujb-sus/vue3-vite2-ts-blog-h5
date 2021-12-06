import { defineComponent } from "vue";
import img from "/src/assets/none-data.jpg";

export default defineComponent({
  name: "noData",
  setup() {
    return () => (
      <div class="no-data">
        <img src={img} />
      </div>
    );
  },
});
