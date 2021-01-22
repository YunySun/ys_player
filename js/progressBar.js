var progressBar = Vue.extend({
  template: `
    <div class="progress" @mousedown="mouseDownAction" @mouseup="mouseUpAction">
      <div class="progress-back">
        <div class="progress__now" :style="{width: value*elWidth+'px'}">
          <i class="ic-progressor"></i>
        </div> 
      </div>
    </div>
  `,
  props: ["value"],
  data() {
    return {
      elWidth: 0,
      startX: 0,
      clientX: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.elWidth = this.$el.getBoundingClientRect().width;

      document.addEventListener("mouseup", (event) => {
        this.mouseUpAction(event);
      });
    });
  },
  methods: {
    mouseDownAction(event) {
      var elRect = this.$el.getBoundingClientRect();
      this.elWidth = elRect.width;
      this.startX = event.clientX;
      var nowX = this.startX - elRect.left;
      this.$emit("input", nowX / this.elWidth);
      this.$el.onmousemove = (e) => {
        this.clientX = e.clientX;
        nowX = this.clientX - elRect.left;
        this.$emit("input", nowX / this.elWidth);
      };
      this.$el.onmouseleave = this.mouseLeaveAction;
      this.$emit("mousedown", event);
    },
    mouseLeaveAction() {
      this.$el.onmousemove = null;
      this.$el.onmouseenter = this.mouseDownAction;
    },
    mouseEnterAction(event) {
      this.mouseDownAction(event);
    },
    mouseUpAction(event) {
      this.$el.onmousemove = null;
      this.$el.onmouseenter = null;
      this.$el.onmouseleave = null;
      this.$emit("mouseup", event);
    },
  },
});

Vue.component("progressBar", progressBar);
