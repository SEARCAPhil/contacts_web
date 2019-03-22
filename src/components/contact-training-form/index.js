import style from './index.styl'

const template = `
<style>${style.toString()}</style>
<form class="remove-modal-section" id="modal-education-form">
    <h3><i class="fa fa-cubes" style="font-size:24px;"></i> Training</h3>
    <p class="text-muted">Please fill up all required fields (*)</p><hr/>
    <span class="status-text"></span><br/>
    
    <div class="form-group">
      <input type="text" class="form-control" placeholder="Title*" id="title" required/>
    </div>

    <div class="form-group">
      <input type="text" class="form-control" placeholder="Venue*" id="venue" required/>
    </div>

    <div class="form-group">
      <select class="form-control type-hidden-accessible" id="trainType" style="width: 100%;" tabindex="-1" aria-hidden="true">
        <option default="" value="short_course">Please Select Training Type</option>
        <option value="short_course">Short Course (default)</option>
      </select>
    </div>

    <p class="text-muted"><i class="fa fa-info-circle"></i> Event Date</p>
    <div class="form-group">
      <label for="from" class="text-muted" style="font-weight: normal;">Date Started*</label>
      <input type="date" class="form-control" placeholder="Date Started *" id="from" required>
    </div>

    <div class="form-group">
      <label class="text-muted" for="to" style="font-weight: normal;">Date Ended</label>
      <input type="date" class="form-control" placeholder="Date Finished"  id="to">
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


    <p>
      <b>IMPORTANT :</b> For SEARCA's short-term training courses and similar learning events (e.g., executive forums and study tours) / successfully completed Center's Academic Bridging Program, Please select <br>
      <em>Training Alumni</em>. Skip if not appropriate.
    </p>


    <div class="form-group">
        <span class="saaf-type-status-text-section"></span>
        <select class="form-control type type-hidden-accessible" id="type" style="width: 100%;" tabindex="-1" aria-hidden="true">
          <option default="" value="null">Please Select SAAF Type</option>
          <option value="null">N/A</option>
        </select>
        <div class="form-group" id="select-saaf-null"></div>
    </div>


    <div class="form-group">
      <textarea class="form-control" placeholder="Notes" rows="5" id="notes"></textarea>
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
