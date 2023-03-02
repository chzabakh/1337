# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2019/11/24 14:41:27 by chzabakh          #+#    #+#              #
#    Updated: 2020/02/13 17:11:46 by chzabakh         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

NAME = fractol

SRC = ./src/main.c ./src/image.c ./src/tools.c ./src/mandelbrot.c \
	  ./src/tricorn.c ./src/julia.c ./src/multibrot.c ./src/fbrot.c \
	  ./src/burningship.c ./src/tools2.c

OBJ = $(SRC:.c=.o)

CC = gcc

INC = src/fractol.h libft/libft.h

CFLAGS = -Wall -Wextra -Werror

all: $(NAME)

$(NAME):$(INC) $(OBJ)
		@make -C libft/
		@gcc  $(OBJ) libft/libft.a -o $(NAME) \
		-L /usr/local/lib -lmlx -framework OpenGl -framework AppKit

clean:
		@make clean -C libft
		@rm -f $(OBJ)

fclean: clean
		@make fclean -C libft
		@rm -f $(NAME)

re: fclean all
