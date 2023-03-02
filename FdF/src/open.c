/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   ft_open.c                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/09/14 15:24:08 by chzabakh          #+#    #+#             */
/*   Updated: 2019/11/14 20:22:01 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "fdf.h"

t_mlx		ft_convert(char ***ctab2, int min, int l)
{
	t_mlx	table;
	t_var2	var;

	var.i = 0;
	var.j = 0;
	table.intable = (int **)malloc(sizeof(int*) * (l));
	table.hextable = (int **)malloc(sizeof(int*) * (l));
	while (var.i < l)
	{
		table.intable[var.i] = (int*)malloc(sizeof(int) * min);
		table.hextable[var.i++] = (int*)malloc(sizeof(int) * min);
	}
	var.i = -1;
	while (++var.i < l)
	{
		var.j = -1;
		while (++var.j < min)
		{
			table.intable[var.i][var.j] = ft_atoi(ctab2[var.i][var.j]);
			table.hextable[var.i][var.j] = ft_hex(ctab2[var.i][var.j]);
		}
	}
	table.l = l;
	table.min = min;
	return (table);
}

void		ft_check_length(int *tab, int l)
{
	int		i;

	i = 0;
	while (i < l)
	{
		if (tab[0] <= tab[i])
		{
			i++;
		}
		else
		{
			ft_putendl("the first line is not the smallest");
			exit(0);
		}
	}
}

t_mlx		ft_122(char *fs, int fd2)
{
	int			*ltab;
	char		**ctab;
	char		***ctab2;
	t_var		var;
	t_mlx		test;

	close(fd2);
	var.i = 0;
	var.l = 0;
	ctab = ft_strsplit(fs, '\n');
	while (ctab[var.l])
		var.l++;
	ltab = (int*)malloc(sizeof(int) * (var.l + 1));
	ctab2 = (char ***)malloc(sizeof(char **) * (var.l + 1));
	ctab2[var.l] = NULL;
	while (ctab[var.i])
	{
		ctab2[var.i] = ft_strsplit(ctab[var.i], ' ');
		ltab[var.i] = ft_words_counter(ctab[var.i], ' ');
		var.i++;
	}
	ft_check_length(ltab, var.l);
	test = ft_convert(ctab2, ltab[0], var.l);
	ft_boarddel(ctab, ctab2, ltab);
	return (test);
}

void		ft_error(int fd)
{
	if (fd < 0)
	{
		ft_putstr("\033[0;31m");
		ft_putstr("error: ");
		ft_putstr("\033[1;33m");
		perror("");
		exit(0);
	}
}

t_mlx		ft_open(char *argument, char **fs)
{
	t_fd	fd;
	int		rd;
	char	buff[BUFF_SIZE + 1];
	char	*tmp_fs;

	fd.fd1 = open(argument, O_RDONLY);
	fd.fd2 = open(argument, O_RDONLY);
	ft_error(fd.fd1);
	if ((read(fd.fd1, buff, 1) == 0) || buff[0] == '\n')
	{
		ft_putendl("\033[0;33mno data found.");
		exit(0);
	}
	*fs = ft_strnew(0);
	while ((rd = read(fd.fd2, buff, BUFF_SIZE)) > 0)
	{
		buff[rd] = '\0';
		tmp_fs = ft_strjoin(*fs, buff);
		ft_strdel(fs);
		*fs = tmp_fs;
	}
	close(fd.fd1);
	if (rd < 0)
		perror("\033[0;31merror\033[1;33m");
	return (ft_122(*fs, fd.fd2));
}
