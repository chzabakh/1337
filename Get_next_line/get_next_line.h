/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   get_next_line.h                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/04/26 17:57:29 by chzabakh          #+#    #+#             */
/*   Updated: 2019/05/03 20:55:35 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef GET_NEXT_LINE_H
# define GET_NEXT_LINE_H
# include "./libft/libft.h"
# define BUFF_SIZE 32

typedef struct	s_carrier
{
	char				*content;
	int					fd_id;
	struct s_carrier	*next;
}				t_carrier;

int				get_next_line(const int fd, char **line);
#endif
