
const template = `
<form class="remove-modal-section" id="modal-employment-form">
    <h3><i class="fa fa-briefcase" style="font-size:24px;"></i> Employment</h3>
    <p>Please fill up all required fields (*)</p>
    <span class="status-text"></span>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="Company Name*" id="company_name" required/>
    </div>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="Position*" id="position" required/>
    </div>

    <div class="form-group">
      <input type="number" class="form-control" placeholder="Year Started *" min="1950" id="year_started" required/>
    </div>

    <div class="form-group">
      <input type="number" class="form-control" placeholder="Year Ended" min="1950" id="year_ended"/>
    </div>

    <div class="form-group">
      <input type="text" class="form-control" placeholder="Company Address" id="address"/>
    </div>

    <div class="form-group">
      <input type="text" class="form-control" placeholder=" Sector(Telecom, Manufacturing, etc..)" id="sector"/>
    </div>
    
    <div class="form-group">
      <br/>
      <button class="btn btn-default" type="button" id="modal-dialog-close-button">CANCEL</button>
      <button class="btn btn-danger" id="modal-dialog-save-button">PROCEED</button> 
    </div>
</form>
`

export { template }