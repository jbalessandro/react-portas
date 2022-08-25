import styles from "../../../styles/Jogo.module.css"
import { useEffect, useState } from "react"
import { criarPortas, atualizarPortas } from "../../../functions/portas"
import Porta from "../../../components/Porta"
import Link from "next/link"
import { useRouter } from "next/router"

export default function Jobo() {
    const router = useRouter()

    const [valido, setValido] = useState(false)
    const [portas, setPortas] = useState([])

    useEffect(() => {
        const portas = +router.query.portas
        const temPresente = +router.query.temPresente
        const qtdePortasValidas = portas >= 3 && portas <= 10
        const temPresenteValido = temPresente >= 1 && temPresente <= portas
        setValido(qtdePortasValidas && temPresenteValido)
    }, [portas])

    useEffect(() => {
        const portas = +router.query.portas
        const temPresente = +router.query.temPresente
        setPortas(criarPortas(portas, temPresente))
    }, [router?.query])

    function renderizarPortas() {
        return portas.map(porta => {
          return <Porta key={porta.numero} value={porta} 
          onChange={novaPorta => {
            setPortas(atualizarPortas(portas, novaPorta)) 
          }} />
        })
      }

    return (
        <div id={styles.jogo}>
            <div className={styles.portas}>
                {valido ? 
                    renderizarPortas() :
                    <h1>Valores inválidos</h1>
                }
            </div>
            <div className={styles.botoes}>
                <Link href="/">
                    <button>Reiniciar Jogo</button>
                </Link>
            </div>
        </div>
    )
}