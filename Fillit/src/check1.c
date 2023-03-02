/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   check1.c                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/05/16 17:06:10 by chzabakh          #+#    #+#             */
/*   Updated: 2019/06/24 21:23:43 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fillit.h"

int		ft_check_dpn(t_tetriminos elements)
{
	if ((elements.diez != 4) || (elements.point != 12)
			|| (elements.newline != 4))
		return (0);
	if (elements.file_sto[elements.i] != '\n'
			&& elements.file_sto[elements.i] != '\0')
		return (0);
	if (elements.file_sto[elements.i] == '\n'
			|| elements.file_sto[elements.i] == '\0')
		return (1);
	return (0);
}

int		ft_check_tetrimino_dpn(char *file_sto)
{
	t_tetriminos	var;

	var.file_sto = file_sto;
	var.i = 0;
	while (var.file_sto[var.i] != '\0')
	{
		var.point = 0;
		var.diez = 0;
		var.newline = 0;
		var.j = 0;
		while (var.j <= 19 && var.file_sto[var.i] != '\0')
		{
			if (var.file_sto[var.i] == '.')
				var.point = var.point + 1;
			if (var.file_sto[var.i] == '#' || var.file_sto[var.i] == '\n')
				(var.file_sto[var.i] == '#') ? var.diez++ : var.newline++;
			var.i++;
			var.j++;
		}
		if (ft_check_dpn(var) == 0)
			return (0);
		(var.file_sto[var.i] == '\n') ? var.i++ : var.i;
	}
	return (1);
}

int		ft_check_newlines(char *file_storage)
{
	int	i;
	int	diez;
	int	newline;

	i = 0;
	diez = 0;
	newline = 0;
	while (file_storage[i] != '\0')
	{
		if (file_storage[i] == '#')
			diez = diez + 1;
		if (file_storage[i] == '\n')
			newline = newline + 1;
		i++;
	}
	if (newline != diez + (diez / 4) - 1)
		return (0);
	if (ft_check_tetrimino_dpn(file_storage) == 1)
		return (1);
	return (0);
}

int		ft_check_elements(char *file_storage)
{
	int		i;

	i = 0;
	while (file_storage[i] != '\0')
	{
		if ((file_storage[i] == '.' || file_storage[i] == '#'
					|| file_storage[i] == '\n')
				&& (ft_strlen(file_storage) <= 545))
			i++;
		else
			return (0);
	}
	if (ft_check_newlines(file_storage) == 1)
		return (1);
	return (0);
}

int		ft_file_storage(int fd)
{
	char	buff[BUFF_SIZE + 1];
	char	*file_storage;
	char	*temp_2free_storage;
	int		rd;

	file_storage = ft_strnew(0);
	while ((rd = read(fd, buff, BUFF_SIZE)) > 0)
	{
		buff[rd] = '\0';
		temp_2free_storage = file_storage;
		file_storage = ft_strjoin(file_storage, buff);
		free(temp_2free_storage);
	}
	if (ft_check_elements(file_storage) == 1)
	{
		if (ft_validate_tetriminos(file_storage) == 0)
		{
			ft_strdel(&file_storage);
			return (0);
		}
		ft_strdel(&file_storage);
		return (1);
	}
	ft_strdel(&file_storage);
	return (0);
}
