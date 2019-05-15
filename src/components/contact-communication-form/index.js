import style from './index.styl'

const template = `
<style>${style.toString()}</style>
<form class="remove-modal-section" id="modal-employment-form">
    <h3><i class="fa fa-phone" style="font-size:24px;"></i> Communication</h3>
    <p>Please fill up all required fields (*)</p> <hr/>
    <span class="status-text"></span>
    
    <div class="input-group">
      <span class="input-group-addon com-addon">
        <select name="type" id="type">
        <option value="phone">Phone</option>
        <option value="fax">Fax</option>
        <option value="email">Email</option>
        </select>
      </span>
      <input type="text" id="value" class="form-control" placeholder="Value" required>
    </div>
    
    
    <div class="row btn-form">
      <div class="col col-lg-6 col-xs-6 col-md-6 col-sm-6 text-center btn-item" id="modal-dialog-close-button">
        <p>CANCEL</p>
      </div>
      <button class="col col-lg-6 col-xs-6 col-md-6 col-sm-6 text-center btn-item" id="modal-dialog-save-button">
        <p>PROCEED</p>
      </button>
    </div>
</form>
`

export { template }
