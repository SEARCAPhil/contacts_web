const template = `
<form class="remove-modal-section" id="modal-employment-form">
    <h3><i class="fa fa-briefcase" style="font-size:24px;"></i> Employment</h3>
    <p>Please fill up all required fields (*)</p>
    <hr/>
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
