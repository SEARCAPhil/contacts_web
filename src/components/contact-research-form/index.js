import style from './index.styl'

const template = `
<style>${style.toString()}</style>
<form class="remove-modal-section" id="modal-education-form">
    <h3><i class="fa fa-book" style="font-size:24px;"></i> Research</h3>
    <p class="text-muted">Please fill up all required fields (*)</p>
    <span class="status-text"></span>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="Title*" id="title" required/>
    </div>

    <div class="form-group">
      <input type="number" class="form-control" placeholder="Year Started *" min="1950" id="from" required>
    </div>

    <div class="form-group">
      <input type="number" class="form-control" placeholder="Year Finished" min="1950" id="to">
    </div>

    <p class="text-muted">Other Details (Optional)</p>

    <div class="form-group">
      <input type="text" class="form-control" placeholder="Field Study" id="study"/>
    </div>
    
    <div class="form-group">
      <input type="text" class="form-control" placeholder="Host University" id="host"/>
    </div>

    <div class="form-group">
      <input type="text" class="form-control" placeholder="Fundings (use comma , as separator)" id="fundings"/>
    </div>

    <div class="form-group">
      <textarea class="form-control" placeholder="Remarks" rows="5" id="remarks"></textarea>
    </div>

    <div class="form-group">
        <p class="text-muted"> For SAAF Use Only</p>
        <span class="saaf-type-status-text-section"></span>
        <select class="form-control type type-hidden-accessible" id="type" style="width: 100%;" tabindex="-1" aria-hidden="true">
          <option default="" value="null">Please Select SAAF Type</option>
          <option value="null">N/A</option>
        </select>
        <div class="form-group" id="select-saaf-null"></div>
    </div>

    
    <div class="form-group">
      <br/>
      <button class="btn btn-default" type="button" id="modal-dialog-close-button">CANCEL</button>
      <button class="btn btn-danger" id="modal-dialog-save-button">PROCEED</button> 
    </div>
</form>
`

export { template }