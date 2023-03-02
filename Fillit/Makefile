# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2019/05/09 21:35:53 by chzabakh          #+#    #+#              #
#    Updated: 2019/06/25 21:56:09 by chzabakh         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

NAME = fillit

all: $(NAME)

$(NAME):
	@cd libft && make re
	@gcc -Wall -Wextra -Werror -o $(NAME) ./src/main.c ./src/check1.c \
		./src/check2.c ./src/board.c ./src/open.c ./src/tetriminos.c \
		./src/map_dimension.c ./src/solve.c ./src/tools.c \
		./src/get_next_line.c ./libft/libft.a -I ./src/fillit.h

clean:
	@cd libft && make clean

fclean: clean
	@cd libft && make fclean
	@rm -rf $(NAME)

re: fclean all
