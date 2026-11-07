import { useQuiz } from './hooks/useQuiz'
import { Home } from './pages/Home/Home'
import { Quiz } from './pages/Quiz/Quiz'
import { Result } from './pages/Result/Result'
import { About } from './pages/About/About'

function App() {
  const quiz = useQuiz()

  const hasProgress = Object.keys(quiz.answers).length > 0

  return (
    <div className="min-h-screen bg-cream text-body">
      {quiz.phase === 'home' && (
        <Home
          onStart={quiz.startQuiz}
          onAbout={() => quiz.setPhase('about')}
          hasProgress={hasProgress}
          onResume={quiz.resumeQuiz}
        />
      )}

      {quiz.phase === 'quiz' && (
        <Quiz
          answers={quiz.answers}
          onAnswer={quiz.answerQuestion}
          onFinish={quiz.finishQuiz}
          onRestart={quiz.restart}
        />
      )}

      {quiz.phase === 'result' && quiz.report && (
        <Result report={quiz.report} onRestart={quiz.restart} />
      )}

      {quiz.phase === 'about' && (
        <About onBack={() => quiz.setPhase('home')} onClearData={quiz.clearLocalData} />
      )}
    </div>
  )
}

export default App
