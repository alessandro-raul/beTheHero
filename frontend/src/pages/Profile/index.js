import React, {useEffect, useState} from 'react'
import logoImage from '../../assets/logo.svg';
import { FiPower } from 'react-icons/fi';
import { FiTrash2 } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import api from '../../pages/services/api';

export default function Profile(){
    const [incidents, setIncidents] = useState([]);
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(()=>  {api.get('profile', {headers:{
        Authorization: ongId,
    }
    }).then(response=>{
        setIncidents(response.data);
    })
    }, [ongId])

    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers:{
                Authorization: ongId,
            }
            
            });
            setIncidents(incidents.filter(incident=>incident.id !== id));
        }catch (err){
            alert('Erro ao deletar caso, tente novamente')

        }
    }

    const history = useHistory();
    function handleLogout(){
        localStorage.clear();
        history.push('/')

    }

    

    return(
        <div className="profile-container">
            <header>
                <img src={logoImage} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incident/new">Cadastrar novo caso</Link>
    
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {incidents.map(incident=>(
                     <li key={incident.id}>
                     <strong>CASO:</strong>
                     <p>{incident.title}</p>
 
                     <strong>DESCRIÇÃO:</strong>
                     <p>{incident.description}</p>
 
                     <strong>VALOR:</strong>
                     <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
 
                     <button type="button" onClick={()=> handleDeleteIncident(incident.id)}>
                         <FiTrash2 size={20} color="#e02041" />
                     </button>
 
                 </li>
                ))}
               
              
            </ul>

           
        </div>
    )
}