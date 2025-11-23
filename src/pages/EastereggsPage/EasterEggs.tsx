import './easterEggs.css'

export default function EasterEggs(){
    const eggs = [
        {
            name: 'Gre-nal 2015',
            how: 'Faça o cálculo 5x0',
            result: 'O fundo mudará para um background do Gre-nal 407 e aparecerão imagens dos jogadores que marcaram gols na partida'
        },
        {
            name: 'Libertadores 2017',
            how: 'Quando o resultado de algum cálculo for exatamente 2017 (sem casas decimais), o easter egg começará',
            result: 'O fundo mudará para um background do elenco campeão da Libertadores de 2017 e começará a tocar a paródia do canal do YouTube FutParódias sobre a conquista da Libertadores de 2017 por algum tempo'
        },
        {
            name: 'Renato Portaluppi',
            how: 'Quando o resultado do cálculo for 7 ou 1983, o easter egg acontecerá',
            result: 'Irá aparecer uma imagem de Renato Portaluppi no canto da tela, semelhante ao Toasty do que aparece no Mortal Kombat'
        },
        {
            name: 'Botão de volume',
            how: 'Clique no botão de volume presente na calculadora',
            result: 'Não acontecerá NADA'
        }
    ]

    return (
        <div className='eggs-conteiner'>
            <h1 className='eggs-title'>Easter Eggs</h1>
            <p className='eggs-subtitle'>Pequenos segredos escondidos na calculadora</p>
            <div className='eggs-table'>
                <div className='eggs-header'>
                    <span>Nome</span>
                    <span>Como Realizar</span>
                    <span>O que Acontece</span>
                </div>
                {eggs.map((egg, i) => (
                    <div className='eggs-row' key={i}>
                        <span>{egg.name}</span>
                        <span>{egg.how}</span>
                        <span>{egg.result}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}