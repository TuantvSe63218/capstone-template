import React, { Component } from 'react';
import HardSkillForm from '../../component/create-position-form/hard-skill-form/HardSkillForm';
import SoftSkillForm from '../../component/create-position-form/soft-skill-form/SoftSkillForm';
import LanguageForm from '../../component/create-position-form/language-form/LanguageForm';
import { convertPositionList } from "../../service/util/util";
import SelectBar from '../../component/create-position-form/select-search/SelectBar';

class AddUserPosForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMinimize: false
        }
    }

    onDeletePositionForm = (positionFormIndex) => {
        this.props.onDeletePositionForm(positionFormIndex)
    }

    onUpdatePositionID = (value, positionFormIndex) => {
        this.props.onUpdatePositionID(value, positionFormIndex)
    }

    onHandleUpdateNOC = (event) => {
        var { positionFormIndex } = this.props
        var value = event.target.value
        this.props.onUpdateNOC(value, positionFormIndex)
    }

    setMinimize = () => {
        this.setState({
            isMinimize: !this.state.isMinimize
        })
    }

    render() {
        var { item, positionFormIndex, positionList } = this.props
        var listConverted = convertPositionList(positionList)
        const showSkill = () => {
            if (this.state.isMinimize)
                return ""
            else
                return (
                    <React.Fragment>
                        <LanguageForm language={item.language}
                            positionFormIndex={positionFormIndex}
                            onAddLanguage={this.props.onAddLanguage}
                            onDeleteLanguage={this.props.onDeleteLanguage}
                            onUpdateLanguageID={this.props.onUpdateLanguageID}
                            onUpdateLanguagePriority={this.props.onUpdateLanguagePriority}
                        />
                        <SoftSkillForm softSkill={item.softSkillIDs}
                            positionFormIndex={positionFormIndex}
                            onAddSoftSkill={this.props.onAddSoftSkill}
                            onDeleteSoftSkill={this.props.onDeleteSoftSkill}
                            onUpdateSoftSkillID={this.props.onUpdateSoftSkillID}
                        />
                        <HardSkillForm hardSkill={item.hardSkills}
                            positionFormIndex={positionFormIndex}
                            onAddHardSkill={this.props.onAddHardSkill}
                            onDeleteHardSkill={this.props.onDeleteHardSkill}
                            updateHardSkillExp={this.props.updateHardSkillExp}
                            onUpdateHardSkillPriority={this.props.onUpdateHardSkillPriority}
                            onUpdateHardSkillID={this.props.onUpdateHardSkillID}
                            onUpdateHardSkillCerti={this.props.onUpdateHardSkillCerti}
                        />
                    </React.Fragment>
                )
        }
        return (
            <div className="card mb-50" style={{boxShadow:2}}>
                <div className="card-body">
                    <div className="form-group">
                        <div className="row">
                            {/* Position */}
                            <div className="col-1 mt-15-ml-30">
                                <label className="bmd-label  ">
                                    <h4 className="font-weight-bold">
                                        Position
                                </h4>
                                </label>
                            </div>

                            {/* Select Bar */}
                            <div className="col-4">
                                <SelectBar
                                    list={listConverted}
                                    onUpdatePositionID={this.onUpdatePositionID}
                                    name="positionID"
                                    positionFormIndex={positionFormIndex}
                                    value={item.posID}
                                />
                            </div>

                            {/* Number of candidate */}
                            <div className="col-2 mt">
                                <label className="bmd-label ">
                                    <h4 className="font-weight-bold ">
                                        Number of candidate
                                    </h4>
                                </label>
                            </div>
                            <div className="col-3">
                                <div className="form-group">
                                    <input type="number" className="form-control" min="0" onChange={this.onHandleUpdateNOC} value={item.numberOfCandidates} />
                                </div>
                            </div>

                            {/* Button Add and Minimize */}
                            <div className="col">
                                <span className="material-icons pull-right clear" onClick={() => this.onDeletePositionForm(positionFormIndex)}>clear</span>
                                <span className="material-icons pull-right clear" onClick={this.setMinimize} > {this.state.isMinimize === false ? 'minimize' : 'crop_free'}</span>
                            </div>
                        </div>

                        {showSkill()}
                    </div>
                </div>
            </div>
        );
    }
}

export default AddUserPosForm;