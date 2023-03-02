# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2019/03/31 14:40:34 by chzabakh          #+#    #+#              #
#    Updated: 2019/05/10 17:20:50 by chzabakh         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

NAME = libft.a

all: $(NAME)

$(NAME):
	@gcc -c -Wall -Wextra -Werror ft_*.c -I libft.h
	@ar rc $(NAME) ft_*.o
	@ranlib $(NAME)

clean:
	@rm -f ft_*.o

fclean: clean
	@rm -f $(NAME)

re: fclean all
