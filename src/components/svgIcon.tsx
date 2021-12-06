import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'svgIcon',
  props: {
    name: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    const iconName = computed(() => `#${props.name}`);
    return () => (
      <svg class="icon" aria-hidden="true">
        <use xlinkHref={iconName.value}>
        </use>
      </svg>
    );
  },
});


