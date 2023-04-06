import { AbBotao, AbCampoTexto, AbModal } from 'ds-alurabooks';
import imagemPrincipal from './assets/login.png';
import { useState } from 'react';
import './ModalCadastroUsuario.css';
import http from '../../http';

interface PropsModalCadastroUsuario {
  aberta: boolean;
  aoFechar: () => void;
}

export const ModalCadastroUsuario = ({
  aberta,
  aoFechar,
}: PropsModalCadastroUsuario) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [endereco, setEndereco] = useState('');
  const [complemento, setComplemento] = useState('');
  const [cep, setCep] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaConfirmada, setSenhaConfirmada] = useState('');

  const aoSubmeterFormular = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const usuario = { nome, email, senha, endereco, cep, complemento };
    http
      .post('public/registrar', usuario)
      .then(() => {
        alert('Usuario foi cadastrado com sucesso');
        setNome('');
        setEmail('');
        setEndereco('');
        setComplemento('');
        setCep('');
        setSenha('');
        setSenhaConfirmada('');
        aoFechar();
      })
      .catch(() => {
        alert('Ops alguma coisa deu errado!');
      });
  };

  return (
    <AbModal titulo="Cadastrar" aberta={aberta} aoFechar={aoFechar}>
      <div className="corpoModalCadastro">
        <figure>
          <img
            src={imagemPrincipal}
            alt="Monitor com uma fechadura e uma pessoa com uma chave"
          />
        </figure>
        <form onSubmit={aoSubmeterFormular}>
          <AbCampoTexto value={nome} label="Nome" onChange={setNome} />
          <AbCampoTexto
            value={email}
            label="Email"
            onChange={setEmail}
            type="email"
          />
          <AbCampoTexto
            value={endereco}
            label="Endereco"
            onChange={setEndereco}
          />
          <AbCampoTexto
            value={complemento}
            label="Complemento"
            onChange={setComplemento}
          />
          <AbCampoTexto value={cep} label="CEP" onChange={setCep} />
          <AbCampoTexto
            value={senha}
            label="Senha"
            onChange={setSenha}
            type="password"
          />
          <AbCampoTexto
            value={senhaConfirmada}
            label="Confirmar Senha"
            onChange={setSenhaConfirmada}
            type="password"
          />
          <footer>
            <AbBotao texto="Cadastrar" />
          </footer>
        </form>
      </div>
    </AbModal>
  );
};
