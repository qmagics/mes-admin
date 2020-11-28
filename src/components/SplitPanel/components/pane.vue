<template>
	<div :class="classes">
		<slot></slot>
	</div>
</template>

<script>
  export default {
    name: 'Pane',
    props: {
      className: String
    },
    data() {
      const classes = [this.$parent.split, this.className]
      return {
        classes: classes.join(' '),
        percent: 50
      }
    }
  }
</script>

<style scoped lang="scss">
@import "~@/styles/variables.scss";

.splitter-pane.vertical.splitter-paneL {
  position: absolute;
  left: 0px;
  height: 100%;
  padding-right: $gutter/2;
}

.splitter-pane.vertical.splitter-paneR {
  position: absolute;
  right: 0px;
  height: 100%;
  padding-left: $gutter/2;
}

.splitter-pane.horizontal.splitter-paneL {
  position: absolute;
  top: 0px;
  width: 100%;
}

.splitter-pane.horizontal.splitter-paneR {
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding-top: $gutter/2;
}
</style>
