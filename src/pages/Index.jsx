import React, { useState } from 'react';
import { Box, VStack, Heading, Input, IconButton, useToast, List, ListItem, ListIcon, Button } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle, FaPlus } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (!input) {
      toast({
        title: 'No task entered',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    const newTask = { id: Date.now(), text: input, isCompleted: false };
    setTasks([...tasks, newTask]);
    setInput('');
  };

  const deleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  };

  const toggleCompletion = (id) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  };

  return (
    <VStack p={4}>
      <Heading mb="8">Todo App</Heading>
      <Box>
        <Input placeholder="Add a task..." value={input} onChange={(e) => setInput(e.target.value)} />
        <IconButton icon={<FaPlus />} onClick={addTask} ml={2} colorScheme="blue" aria-label="Add task" />
      </Box>
      <List spacing={3}>
        {tasks.map((task) => (
          <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center">
            <Box as={task.isCompleted ? 's' : 'span'}>{task.text}</Box>
            <Box>
              <IconButton icon={<FaCheckCircle />} onClick={() => toggleCompletion(task.id)} colorScheme="green" aria-label="Complete task" />
              <IconButton icon={<FaTrash />} onClick={() => deleteTask(task.id)} colorScheme="red" aria-label="Delete task" ml={2} />
            </Box>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default Index;