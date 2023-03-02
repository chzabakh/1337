/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.c                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <chzabakh@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/05/02 16:29:40 by chzabakh          #+#    #+#             */
/*   Updated: 2021/07/05 13:49:48 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#include "ft_ls.h"

void	free_list(t_ls *ls)
{
	if (ls->dirlist)
		ft_lstrmv(&ls->dirlist);
}

void	main_three(t_ls *ls, char *dirname)
{
	if (errno == 13)
	{
		ft_putstr("ft_ls: ");
	}
	ft_print(ls, dirname);
	if (errno == 13)
	{
		ft_putendl(": Permission denied");
		errno = 0;
	}
}

void	main_two(t_ls *ls, char *dirname)
{
	ls->htotal = 0;
	ls->total = 0;
	if (ft_ls(dirname, ls))
	{
		if (ls->args.argdircnt > 1)
		{
			if (ls->nline == 1)
			{
				ft_putchar('\n');
				ls->nline = 0;
			}
			ft_putstr(dirname);
			ft_putstr(":\n");
		}
		ft_print(ls, dirname);
	}
	else if (ls->err_status < 0)
		exit(0);
	else
		main_three(ls, dirname);
}

void	main_four(t_ls *ls, char *dirname, int i, struct passwd *pw)
{
	while (i < ls->args.argdircnt)
	{
		if (ft_strcmp(ls->args.argdirsnms[i], "~") == 0)
			dirname = ft_strdup(pw->pw_dir);
		else
			dirname = ft_strdup(ls->args.argdirsnms[i]);
		main_two(ls, dirname);
		i++;
		if (i < ls->args.argdircnt && ls->dirlisthead->type != 'z')
			ft_putchar('\n');
		if (dirname)
			free(dirname);
		if (ls->dir)
		{
			closedir(ls->dir);
		}
		free_list(ls);
	}
}

int	main(int argc, char **argv)
{
	t_ls			ls;
	struct passwd	*pw;
	char			*dirname;

	pw = NULL;
	dirname = NULL;
	pw = getpwuid(getuid());
	dirs_check(&ls, argv, argc);
	if ((argc == 1 && argv) || !ls.args.argdircnt)
	{
		ft_ls(".", &ls);
		ft_print(&ls, ".");
		if (ls.dir)
		{
			closedir(ls.dir);
		}
		free_list(&ls);
	}
	else if (argc > 1 && argv)
		main_four(&ls, dirname, 0, pw);
	if (ls.args.argdirsnms)
		ft_boardel(ls.args.argdirsnms);
	return (0);
}
