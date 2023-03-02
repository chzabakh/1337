# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2019/10/19 14:38:42 by chzabakh          #+#    #+#              #
#    Updated: 2019/11/20 00:09:16 by chzabakh         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

NAME = fdf

SRC = ./src/main.c ./src/tools.c ./src/open.c ./src/imageiso.c ./src/lineiso.c \
	  ./src/ntools.c ./src/image.c ./src/line.c

OBJ = $(SRC:.c=.o)

CC = gcc

INC = src/fdf.h libft/libft.h

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
