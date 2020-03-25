import React, { useState } from 'react';
import logoImage from '../../assets/logo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import api from '../services/api';

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleIncidents(e){
        e.preventDefault();
    
        const data = {
            title,
            description,
            value
        };
        
        try {
           const response = await api.post('incidents', data, {
                headers:{
                    Authorization: ongId
                }
            });
            alert(`Caso cadastrado com sucesso, ID do caso: ${response.data.id}`)
            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente');
        }
    }

    return(
        <div className="new-incident">
            <div className="conteudo">
                <section>
                    <img src={logoImage} alt="Logo"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                
                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#e02041"/>
                    Voltar para home
                </Link>
                </section>
                <form>
                    <input 
                    value={title}
                    onChange={e=>setTitle(e.target.value)}
                    placeholder="Título do caso"/>

                    <textarea 
                    value={description}
                    onChange={e=>setDescription(e.target.value)}
                    placeholder="Descrição"/>

                    <input 
                    value={value}
                    onChange={e=>setValue(e.target.value)}
                    placeholder="Valor em reais"/>
               
                <button className="button" onClick={handleIncidents}>Cadastrar</button>
                </form>
                
            </div>
        </div>
    )
}