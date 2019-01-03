import style from './index.styl'

const template = `
<style>${style.toString()}</style>
<form class="remove-modal-section" id="modal-education-form">
    <h3><i class="fa fa-graduation-cap" style="font-size:24px;"></i> Education</h3>
    <p class="text-muted">Please fill up all required fields (*)</p>
    <span class="status-text"></span>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="Institution*" id="institution" required/>
    </div>

    <div class="form-group">
      <select class="form-control country country-hidden-accessible" id="country" style="width: 100%;" tabindex="-1" aria-hidden="true">
        <option default="" value="Sao Tome and Principe">Select Country</option>
        <option>Alaska</option>
        <option>California</option>
        <option>Delaware</option>
        <option>Tennessee</option>
        <option>Texas</option>
        <option>Washington</option>
      </select>
    </div>

    <div class="form-group">
    <select class="form-control ctypetype-hidden-accessible" id="type" style="width: 100%;" tabindex="-1" aria-hidden="true">
      <option default="BS" value="BS">Type <i>(default: Bachelor)</i></option>
      <option>MS</option>
      <option>PhD</option>
    </select>
  </div>

    <div class="form-group">
      <input type="text" class="form-control" placeholder="Field" id="field" required/>
    </div>

    <div class="form-group">
      <input type="number" class="form-control" placeholder="Year Graduated *" min="1950" id="year_ended" required/>
    </div>

    <p class="text-muted">Other Details (Optional)</p>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="Scholarship" id="scholarship"/>
    </div>

    
    <div class="form-group">
      <br/>
      <button class="btn btn-default" type="button" id="modal-dialog-close-button">CANCEL</button>
      <button class="btn btn-danger" id="modal-dialog-save-button">PROCEED</button> 
    </div>
</form>
`

export { template }