import style from './index.styl'

const template = `
<style>${style.toString()}</style>
<form class="remove-modal-section" id="modal-employment-form">
    <h3><i class="fa fa-phone" style="font-size:24px;"></i> Communication</h3>
    <p>Please fill up all required fields (*)</p>
    <span class="status-text"></span>
    
    <div class="input-group">
      <span class="input-group-addon">
        <select name="type" id="type">
        <option value="phone">Phone</option>
        <option value="fax">Fax</option>
        <option value="email">Email</option>
        </select>
      </span>
      <input type="text" id="value" class="form-control" placeholder="Value" required>
    </div>
    
    
    <div class="form-group">
      <br/>
      <button class="btn btn-default" type="button" id="modal-dialog-close-button">CANCEL</button>
      <button class="btn btn-danger" id="modal-dialog-save-button">PROCEED</button> 
    </div>
</form>
`

export { template }
