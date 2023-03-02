/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   print_tools.c                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/07/05 14:38:20 by chzabakh          #+#    #+#             */
/*   Updated: 2021/07/05 14:48:16 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ls.h"

char	*ft_GetLastWord(char *dirname)
{
	int		count;
	char	**splt;
	char	*word;

	splt = NULL;
	word = NULL;
	count = ft_words_counter(dirname, '/');
	splt = ft_strsplit(dirname, '/');
	word = ft_strdup(splt[count - 1]);
	ft_boardel(splt);
	return (word);
}

void	ft_check_link(t_ls *ls, char *dirname, int i)
{
	char	*full_path;
	char	*full_path2;

	full_path = NULL;
	full_path2 = NULL;
	ft_putstr(ls->dirlisthead->name);
	if (S_ISLNK(ls->dirlisthead->infos.st_mode) && ls->args.flags.l)
	{
		if (i == 0)
		{
			full_path = ft_strjoin(dirname, "/");
			full_path2 = ft_strjoin(full_path, ls->dirlisthead->name);
			ft_read_link(full_path2);
			free(full_path);
			free(full_path2);
		}
		if (i == 1)
			ft_read_link(dirname);
	}
	if (errno != 13)
		ft_putchar('\n');
}

void	ft_read_link(char *path)
{
	char	*source;

	source = NULL;
	source = ft_strnew(1024);
	readlink(path, source, 1024);
	ft_putstr(" -> ");
	ft_putstr(source);
	free(source);
}

void	ft_minor_major(dev_t st_r_dev)
{
	ft_putnbr(major(st_r_dev));
	ft_putstr(",\t");
	ft_putnbr(minor(st_r_dev));
	ft_putstr("\t");
}
