import React from 'react';
import ProgressIndicator from '../../../../shared/components/loading/progressIndicator';
import BasicSelect,{} from '../../boxSelect/boxSelect';


function RegisterForm(props) {
    const [update, setState] = React.useState(0)
    const [loadingState, setLoading] = React.useState(false)

    function setValue(input, value) {
        input.value = value
        setState(update + 1)
    }


    function clean() {
        props.inputs.forEach(element => {
            element.value = '';
        });

        setState(update + 1)
    }

    const srcImg = 'https://cdn-icons-png.flaticon.com/512/1930/1930101.png'
    function renderImg(img) {
       
        return (
            img?
            <div className="card">
                <img src={img?.value!=''&&img?img.value: srcImg} className='productImg'></img>
                <div className="form" >
                    <div className="row" >
                        <div className="col-12 col-md-6">
                            <div className="form-group">
                                <label >{img.label}</label >
                                <input type="text" className="form-control"
                                    name={img.label}
                                    value={img.value}
                                    onChange={element => setValue(img, element.target.value)}
                                    placeholder="" />
                            </div>
                        </div>
                        <h1></h1>
                    </div>
                </div>
            </div>:<div></div>

        )
    }
    function renderForm() {
        return (
            <div>
                {renderImg(props.img)}
               { props.menu?<BasicSelect 
                    onChange = {(e)=>{props.menu.onChange(e)}}
                    title={props.menu.title}
                    itens={props.menu.itens}
                ></BasicSelect>:<div></div>}
                {props.inputs.map(e =>
                    <div className="form" >
                        <div className="row" >
                            <div className="col-12 col-md-6">
                                <div className="form-group">
                                    <label >{e.label}</label >
                                    <input type="text" className="form-control"
                                        name={e.label}
                                        value={e.value}
                                        onChange={element => setValue(e, element.target.value)}
                                        placeholder="" />
                                </div>
                            </div>
                            <h1></h1>
                        </div>
                    </div>)}
            </div>

        )
    }
    if (loadingState == false) {
        return (
            <div>
                {renderForm()}
                <div className="row">

                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary"
                            onClick={async e => {
                                setLoading(true)
                                await props.onSaveButtonAction(props)
                                setLoading(false)
                            }}>
                            Registrar
                        </button>
                        <button className="btn btn-secondary ml-2"
                            onClick={e => clean()}>
                            Limpar
                        </button>
                    </div>
                </div>
            </div>

        )
    } else {
        return <div>
            <ProgressIndicator />
        </div>
    }
}

export default RegisterForm;