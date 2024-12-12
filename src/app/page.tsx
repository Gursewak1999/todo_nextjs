import Image from "next/image";
import styles from "./page.module.css";
import { PrismaClient } from '@prisma/client'

const TodoList = async () => {

  const prismaClient = new PrismaClient()

  const todos = await prismaClient.todo.findMany();

  console.log(todos)

  //if checkbox is checked then update the todo as done
  const handleCheckboxChange = async (id: number) => {
    const todo = await prismaClient.todo.findUnique({
      where: {
        id: id
      }
    })

    if (todo) {
      await prismaClient.todo.update({
        where: {
          id: id
        },
        data: {
          done: !todo.done
        }
      })
    }
  }


  return <>
    {todos.length === 0 && <p>All Caught-up !</p>}
    <div className={styles.todoList}>
      <ul>
        {
          todos.map(todo => (
            <li key={todo.id} className={styles.todoitem + " " +
              (todo.done ? styles.done : "")}
            >
              <input type="checkbox" checked={todo.done} />
              <span>{todo.title}</span>
            </li>
          ))
        }

      </ul>
    </div >
  </>
}
export default function Home() {

  return (
    <div className={styles.page}>
      <h1>TO-DO</h1>
      <TodoList />
    </div>
  );
}
