import { useState, useEffect, KeyboardEvent, ChangeEvent } from "react";
import { 
  Box, 
  Container, 
  Heading, 
  Input, 
  Button, 
  UnorderedList, 
  ListItem, 
  Checkbox, 
  Flex, 
  IconButton,
  useToast,
  Stack,
  Text
} from "@chakra-ui/react";
import axios from "axios";
import { DeleteIcon } from "@chakra-ui/icons";

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export function TaskApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const toast = useToast();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5003/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast({
        title: "Error fetching tasks",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const addTask = async () => {
    if (!newTaskTitle.trim()) return;
    
    try {
      const response = await axios.post("http://localhost:5003/api/tasks", {
        title: newTaskTitle,
      });
      
      setTasks([response.data, ...tasks]);
      setNewTaskTitle("");
      
      toast({
        title: "Task added",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding task:", error);
      toast({
        title: "Error adding task",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const toggleTaskCompletion = async (id: string, completed: boolean) => {
    try {
      await axios.put(`http://localhost:5003/api/tasks/${id}`, {
        completed: !completed,
      });
      
      setTasks(
        tasks.map((task) => (task.id === id ? { ...task, completed: !completed } : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
      toast({
        title: "Error updating task",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5003/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
      
      toast({
        title: "Task deleted",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting task:", error);
      toast({
        title: "Error deleting task",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box marginTop="100px" marginBottom="40px">
      <Container maxW="container.md" py={8}>
        <Stack spacing="8">
          <Heading as="h1" size="xl" textAlign="center" color="white">
            Task Manager
          </Heading>
          
          <Box bg="gray.800" p={6} borderRadius="md" boxShadow="md">
            <Flex mb={6}>
              <Input
                placeholder="Add a new task..."
                value={newTaskTitle}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setNewTaskTitle(e.target.value)}
                mr={2}
                bg="gray.700"
                color="white"
                borderColor="gray.600"
                _hover={{ borderColor: "teal.200" }}
                _focus={{ borderColor: "teal.200" }}
                onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === "Enter") addTask();
                }}
              />
              <Button 
                colorScheme="teal" 
                onClick={addTask}
                bg="teal.300"
                color="gray.800"
                _hover={{ bg: "teal.200" }}
              >
                Add Task
              </Button>
            </Flex>
            
            <UnorderedList styleType="none" spacing={3} ml={0}>
              {tasks.map((task) => (
                <ListItem 
                  key={task.id} 
                  p={3} 
                  borderWidth="1px" 
                  borderRadius="md"
                  borderColor="gray.600"
                  bg={task.completed ? "gray.700" : "gray.800"}
                >
                  <Flex justify="space-between" align="center">
                    <Checkbox
                      isChecked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id, task.completed)}
                      colorScheme="teal"
                      color="white"
                    >
                      <Text 
                        color="white" 
                        textDecoration={task.completed ? "line-through" : "none"}
                        opacity={task.completed ? 0.6 : 1}
                      >
                        {task.title}
                      </Text>
                    </Checkbox>
                    <IconButton
                      aria-label="Delete task"
                      icon={<DeleteIcon />}
                      onClick={() => deleteTask(task.id)}
                      size="sm"
                      colorScheme="red"
                      variant="ghost"
                    />
                  </Flex>
                </ListItem>
              ))}
            </UnorderedList>
            
            {tasks.length === 0 && (
              <Box textAlign="center" mt={6} color="gray.400">
                No tasks yet. Add one above!
              </Box>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
} 