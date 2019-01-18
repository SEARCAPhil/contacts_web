
import style from './index.styl'

const template = `
<style>${style.toString()}</style>
<form class="remove-modal-section" id="modal-employment-form">
    <h3><i class="fa fa-slideshare" style="font-size:24px;"></i> Engagement</h3>
    <p>Please fill up all required fields (*)</p>
    <span class="status-text"></span>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="Nature of Engagement" id="engagement"/>
    </div>

    <div class="form-group">
      <div class="input-group date">
        <div class="input-group-addon">
          From* <i class="fa fa-calendar"></i>
        </div>
        <input type="date" class="form-control pull-right" id="from" required>
      </div>
      <!-- /.input group -->
      </div>
    </div>

    <div class="form-group">
      <div class="input-group date">
        <div class="input-group-addon">
          To <i class="fa fa-calendar"></i>
        </div>
        <input type="date" class="form-control pull-right" id="to">
      </div>
      <!-- /.input group -->
    </div>

    <div class="form-group">
      <select class="form-control research">
        <option value="null" default>Please select research title</option>
      </select>
    </div>

    <div class="form-group">
    <select class="form-control afftype">
      <option value="null" default>Please select affiliation</option>
    </select>
  </div>
    
    <div class="form-group">
      <br/>
      <button class="btn btn-default" type="button" id="modal-dialog-close-button">CANCEL</button>
      <button class="btn btn-danger" id="modal-dialog-save-button">PROCEED</button> 
    </div>
</form>
`

export { template }
