/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   map_dimension.c                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: ahkhilad <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/06/20 15:28:43 by ahkhilad          #+#    #+#             */
/*   Updated: 2019/06/24 02:33:14 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fillit.h"

int			ft_sqrt(int nb)
{
	int i;

	i = 0;
	while (i <= nb)
	{
		if (i * i >= nb)
		{
			return (i);
		}
		i++;
	}
	return (0);
}

int			ft_nb_tetriminos(char *fs)
{
	int		i;
	int		diez;

	i = 0;
	diez = 0;
	while (fs[i] != '\0')
	{
		if (fs[i] == '#')
			diez++;
		i++;
	}
	return (diez / 4);
}

int			ft_read2(int fd)
{
	char	buff[BUFF_SIZE + 1];
	char	*fs;
	char	*temp;
	int		rd;
	int		map_dimensions;

	map_dimensions = 0;
	fs = ft_strnew(0);
	while ((rd = read(fd, buff, BUFF_SIZE)) > 0)
	{
		buff[rd] = '\0';
		temp = fs;
		fs = ft_strjoin(fs, buff);
		ft_strdel(&temp);
	}
	map_dimensions = ft_sqrt(ft_nb_tetriminos(fs) * 4);
	ft_strdel(&fs);
	return (map_dimensions);
}
