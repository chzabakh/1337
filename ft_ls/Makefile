# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: chzabakh <chzabakh@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2021/05/02 15:12:00 by chzabakh          #+#    #+#              #
#    Updated: 2021/07/05 14:48:42 by chzabakh         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

NAME = ft_ls

SRC =	./srcs/main.c ./srcs/sort.c ./srcs/dirs_check.c \
		./srcs/flags_check.c ./srcs/ls.c ./srcs/ft_print.c \
		./srcs/tools.c ./srcs/dir_sort.c ./srcs/permissions.c ./srcs/link.c \
		./srcs/print_tools.c

OBJ = $(SRC:.c=.o)

CC = gcc

INC = srcs/ft_ls.h get_next_line/get_next_line.h

CFLAGS = -Wall -Wextra -Werror -g #check debugging flag

all: $(NAME)

$(NAME):$(INC) $(OBJ)
		@make -C get_next_line/libft/
		@gcc  $(CFLAGS) $(OBJ) get_next_line/libft/libft.a -o $(NAME) \

clean:
		@make clean -C get_next_line/libft
		@rm -f $(OBJ)

fclean: clean
		@make fclean -C get_next_line/libft
		@rm -f $(NAME)

re: fclean all
