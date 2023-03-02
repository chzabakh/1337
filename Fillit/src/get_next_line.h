/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   get_next_line.h                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/06/29 16:38:42 by chzabakh          #+#    #+#             */
/*   Updated: 2019/06/29 16:42:21 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef GET_NEXT_LINE_H
# define GET_NEXT_LINE_H

# define BUFF_SIZE 32
# include "../libft/libft.h"

typedef struct	s_stock
{
	char			*content;
	int				fd_id;
	struct s_stock	*next;
}				t_stock;

typedef struct	s_va
{
	t_stock		*tmp;
	size_t		check;
	char		buf[BUFF_SIZE + 1];
}				t_va;

int				get_next_line(const int fd, char **line);

#endif
