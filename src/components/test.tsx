import {Component, Vue, Watch, Prop, Emit} from 'vue-property-decorator'
import './test.scss'

@Component({})

export default class Test extends Vue {
  protected render() {
    return (
      <div>
        <div class='test'>我</div>
        <div class='test'>是</div>
        <div class='test'>测</div>
        <div class='test'>试</div>
      </div>
    )
  }
}
