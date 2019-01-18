import style from './index.styl'

const template = `
<style>${style.toString()}</style>
<form class="remove-modal-section" id="modal-education-form">
    <h3><i class="fa fa-cubes" style="font-size:24px;"></i> Training</h3>
    <p class="text-muted">Please fill up all required fields (*)</p>
    <span class="status-text"></span>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="Title*" id="title" required/>
    </div>

    <div class="form-group">
      <input type="text" class="form-control" placeholder="Venue*" id="venue" required/>
    </div>

    <div class="form-group">
      <input type="number" class="form-control" placeholder="Year Started *" min="1950" id="from" required>
    </div>

    <div class="form-group">
      <input type="number" class="form-control" placeholder="Year Finished" min="1950" id="to">
    </div>

    <div class="form-group">
      <select class="form-control type-hidden-accessible" id="trainType" style="width: 100%;" tabindex="-1" aria-hidden="true">
        <option default="" value="short_course">Please Select Training Type</option>
        <option value="short_course">Short Course (default)</option>
      </select>
    </div>

    <p class="text-muted"><i class="fa fa-info-circle"></i> Event Details</p>

    <div class="form-group">
      <input type="text" class="form-control" placeholder="Host University" id="host"/>
    </div>

    <div class="form-group">
      <input type="text" class="form-control" placeholder="Organizing Agency" id="agency"/>
    </div>

    <div class="form-group">
      <input type="text" class="form-control" placeholder="Sponsor" id="sponsor"/>
    </div>

    <p class="text-muted"><i class="fa fa-info-circle"></i> Other details</p>

    <div class="form-group">
      <input type="text" class="form-control" placeholder="scholarship" id="scholarship"/>
    </div>

    <div class="form-group">
        <span class="saaf-type-status-text-section"></span>
        <select class="form-control type type-hidden-accessible" id="type" style="width: 100%;" tabindex="-1" aria-hidden="true">
          <option default="" value="null">Please Select SAAF Type</option>
          <option value="null">N/A</option>
        </select>
        <div class="form-group" id="select-saaf-null"></div>
    </div>

    

    <div class="form-group">
      <input type="text" class="form-control" placeholder="Supervisor's Full Name" id="supervisor"/>
    </div>

    <div class="form-group">
      <input type="text" class="form-control" placeholder="Supervisor's Designation" id="designation"/>
    </div>

    <div class="form-group">
      <textarea class="form-control" placeholder="Notes" rows="5" id="notes"></textarea>
    </div>

    <p>
      SEARCA's short-term training courses and similar learning events (e.g., executive forums and study tours) / successfully completed Center's Academic Bridging Program ?
    </p>

    <div class="form-group">
      <input type="radio" name="searca-learn" class="searca-learn" value="1"/> Yes &emsp;
      <input type="radio" name="searca-learn" class="searca-learn" value="0"/> No
    </div>

    
    <div class="form-group">
      <br/>
      <button class="btn btn-default" type="button" id="modal-dialog-close-button">CANCEL</button>
      <button class="btn btn-danger" id="modal-dialog-save-button">PROCEED</button> 
    </div>
</form>
`

export { template }
