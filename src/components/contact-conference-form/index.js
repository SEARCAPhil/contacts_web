import style from './index.styl'

const template = `
<style>${style.toString()}</style>
<form class="remove-modal-section" id="modal-education-form">
    <h3><i class="fa fa-desktop" style="font-size:24px;"></i> Conference</h3>
    <p class="text-muted">Please fill up all required fields (*)</p>
    <span class="status-text"></span>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="Title*" id="title" required/>
    </div>

    <div class="form-group">
      <input type="text" class="form-control" placeholder="Venue*" id="venue" required/>
    </div>

    <div class="form-group">
      <div class="input-group date">
        <div class="input-group-addon">
          From* <i class="fa fa-calendar"></i>
        </div>
        <input type="date" class="form-control pull-right" id="from" required="">
      </div>
      <!-- /.input group -->
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
      <br/>
      <button class="btn btn-default" type="button" id="modal-dialog-close-button">CANCEL</button>
      <button class="btn btn-danger" id="modal-dialog-save-button">PROCEED</button> 
    </div>
</form>
`

export { template }
