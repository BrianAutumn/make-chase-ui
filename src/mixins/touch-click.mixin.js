export function TouchClickMixin() {
  let onTouchEndBind;
  let onTouchMoveBind;

  function onTouchEnd(){
    if(!this._touchMovement){
      this.onClick()
    }
    this._touchMovement = false;
  }

  function onTouchMove(){
    this._touchMovement = true;
  }

  return {
    mounted(){
      onTouchEndBind = onTouchEnd.bind(this);
      onTouchMoveBind = onTouchMove.bind(this);
      this.$el.addEventListener('touchend', onTouchEndBind)
      this.$el.addEventListener('touchmove', onTouchMoveBind)
      this.$el.addEventListener('click', this.onClick)
    },
    unmounted(){
      this.$el.removeEventListener('touchend', onTouchEndBind)
      this.$el.removeEventListener('touchmove', onTouchMoveBind)
      this.$el.addEventListener('click', this.onClick)
    },
    data(){
      return {
        _touchMovement:false,
        _mouseMovement:false
      }
    }
  }
}



