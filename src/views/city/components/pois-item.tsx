
import './index.scss';

import {Component, Vue, Watch, Prop, Emit} from 'vue-property-decorator'

@Component({
  name: 'PoisItem',
})


export default class PoisItem extends Vue {
 @Prop(Object) public item

@Emit('on-enter')
 public enterThe(item) {
  return item
 }

 protected render() {
   return (
     <li class='item_wrap' on-click= {this.enterThe.bind(this, this.item)}>
        <h4>{this.item.name}</h4>
        <p>{this.item.address}</p>
     </li>
   )
 }
}
